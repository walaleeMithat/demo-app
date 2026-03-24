// app/isr/page.tsx
import { User } from '../types/user';

export const revalidate = 5;
export const dynamic = 'force-static';

async function getUsers(): Promise<User[]> {
    const skip = Math.floor(Math.random() * 200);

    const res = await fetch(`https://dummyjson.com/users?limit=3&skip=${skip}`, {
        next: {
            revalidate: 5,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }

    const data = await res.json();
    return data.users;
}

export default async function ISRPage() {
    const users = await getUsers();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>ISR - Incremental Static Regeneration (Next.js 16)</h1>
            <p>หน้าเป็น Static แต่จะอัปเดตใหม่ทุก <strong>5 วินาที</strong></p>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map((user) => (
                    <li
                        key={user.id}
                        style={{
                            margin: '10px 0',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        <strong>{user.firstName} {user.lastName}</strong> — {user.email}
                        <br />
                        <small>ID: {user.id} | Age: {user.age} | Gender: {user.gender}</small>
                    </li>
                ))}
            </ul>

            <p style={{
                fontSize: '14px',
                color: '#d32f2f',
                fontWeight: 'bold',
                marginTop: '20px'
            }}>
                Last revalidated at: {new Date().toLocaleString('th-TH', {
                timeZone: 'Asia/Bangkok',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })}
            </p>
        </div>
    );
}