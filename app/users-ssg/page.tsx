import { User } from '../types/user';

export const dynamic = 'force-static';        // บังคับให้เป็น Static
export const revalidate = false;              // ไม่ revalidate อัตโนมัติ

async function getUsers(): Promise<User[]> {
    const res = await fetch('https://dummyjson.com/users?limit=3', {
        cache: 'force-cache',          // บังคับ cache ตลอดไป (Static)
        next: {
            revalidate: false,           // ไม่ให้ revalidate
        },
    });

    if (!res.ok) throw new Error('Failed to fetch users');

    const data = await res.json();
    return data.users;
}

export default async function SSGPage() {
    const users = await getUsers();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>SSG - Static Site Generation (Next.js 16)</h1>
            <p>ข้อมูลถูก generate ตอน build time ja และจะไม่เปลี่ยนจนกว่าจะ rebuild</p>

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
                        <small>ID: {user.id} | Age: {user.age}</small>
                    </li>
                ))}
            </ul>

            <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
                Generated at: {new Date().toLocaleString('th-TH', {
                timeZone: 'Asia/Bangkok'
            })}
            </p>
        </div>
    );
}