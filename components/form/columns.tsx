"use client"

import { ColumnDef } from "@tanstack/react-table"
//import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import{deleteUser} from '../../actions/action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  _id: string
  address: string
  status: "pending" | "processing" | "success" | "failed"
  name: string
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "button",
    header: "",
    cell: ({ row }) => (
      <Button
        className="text-blue-500 hover:text-blue-600"
        onClick={ () => { console.log('row info',row); deleteUser(row.original._id) } }
      >
        Delete
      </Button>
    ),
  }
]
