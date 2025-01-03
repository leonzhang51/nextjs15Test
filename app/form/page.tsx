'use client';
import React,{useEffect,useState,useActionState} from 'react';
import { getAllUsers, addUser } from '../../actions/action';
import {columns} from '../../components/form/columns';
import {DataTable} from '../../components/form/data-table';

type user = {
    _id: string;
    id: string;
    name: string;
    address: string;
    status: 'pending' | 'processing' | 'success' | 'failed';
};
type users=user[];
export default function Form ()
{
    const [mangoDbUsers, setMangoDbUsers] = useState<users>([]);
//   const [state, formAction,isPending] = useActionState(submitActionWithCurrentState, {
//     users: mangoDbUsers|| [],
//     error: null,
//   });
    
const [state, formAction,isPending] = useActionState(addUser, [], 'addUser');
    
    useEffect( () =>
    {
        const getUsers = async () =>
        {
            const newUsers: user | void = await getAllUsers();
            if (Array.isArray(newUsers) && newUsers.length > 0) {
                setMangoDbUsers(newUsers);
            }
        }
        getUsers();
    },[]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FARM USER CRUD</h1>
      <form action={formAction} id="action-hook-form" className="mb-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800"
          />
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            type="submit" disabled={isPending}
          >
            Add User
          </button>
        </div>
      </form>
      <div className="text-red-500">{state?.[0]?.error}</div>
      {/* {state?.[1]?.map((user: user) => (
        <div key={user.name} className="mt-2">
          ID: {user._id} Name: {user.name} Address: {user.address}
        </div>
      ) ) } */}
          {/* {state.length<2&&mangoDbUsers?.map((users: user) => (
              <div key={ users.name } className="mt-2">
         ID: {users._id} Name: {users.name} Address: {users.address} 
        </div>
          ) ) } */}
          {state.length<2?<DataTable columns={columns} data={mangoDbUsers}/>:<DataTable columns={columns} data={state[1]}/>}
    </div>
  );
}