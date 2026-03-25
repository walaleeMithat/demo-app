import { Suspense } from 'react';
import Loading from './loading';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

async function getUsers(): Promise<User[]> {
    const res = await fetch('https://dummyjson.com/users?limit=5');
    const data = await res.json();
    return data.users;
}

export default function UsersPage() {
    const usersPromise = getUsers();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Users List</h1>
            <Suspense fallback={<Loading />}>
                <UserList promise={usersPromise} />
            </Suspense>
        </div>
    );
}

async function UserList({ promise }: { promise: Promise<User[]> }) {
    const users = await promise;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.firstName} {user.lastName} - {user.email}
                </li>
            ))}
        </ul>
    );
}