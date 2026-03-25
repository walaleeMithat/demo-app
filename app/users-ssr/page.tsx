// app/ssr/page.tsx
import { User } from '../types/user';
import { unstable_noStore as noStore } from 'next/cache';

async function getUsers(): Promise<User[]> {
    noStore();

    const skip = Math.floor(Math.random() * 200);

    const res = await fetch(
        `https://dummyjson.com/users?limit=6&skip=${skip}`,
        { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    return data.users;
}

export default async function SSRPage() {
    const users = await getUsers();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>SSR - Server-Side Rendering</h1>
            <p style={{ color: 'red', fontWeight: 'bold' }}>
                ต้องเห็นรายชื่อ + ID เปลี่ยนทุกครั้งที่รีเฟรช
            </p>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map((user) => (
                    <li
                        key={user.id}
                        style={{
                            margin: '12px 0',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                        }}
                    >
                        <strong>{user.firstName} {user.lastName}</strong> — {user.email}
                        <br />
                        <small>ID: {user.id} | Age: {user.age} | Gender: {user.gender}</small>
                    </li>
                ))}
            </ul>

            <p style={{ fontSize: '14px', color: '#d32f2f', fontWeight: 'bold', marginTop: '20px' }}>
                Rendered at: {new Date().toLocaleString('th-TH', {
                timeZone: 'Asia/Bangkok',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })}
            </p>
        </div>
    );
}