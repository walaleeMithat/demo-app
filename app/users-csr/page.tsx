'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/user';

export default function CSRPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fetchedAt, setFetchedAt] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const skip = Math.floor(Math.random() * 200);

            const res = await fetch(
                `https://dummyjson.com/users?limit=3&skip=${skip}`,
                { cache: 'no-store' }  // ป้องกัน browser cache
            );

            if (!res.ok) throw new Error('Failed to fetch users');

            const data: { users: User[] } = await res.json();
            setUsers(data.users);
            setFetchedAt(new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log('👉 RUN ON CLIENT');
        setIsClient(true);
        fetchUsers();
    }, [fetchUsers]);

    console.log('👉 RUN WHERE?', typeof window);

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>CSR - Client-Side Rendering (Next.js 16)</h1>
            <p>ข้อมูลถูกดึงและ render บนเบราว์เซอร์ฝั่ง client</p>

            {isClient && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>✔ รันบน Client จริง!</p>
            )}

            <button
                onClick={fetchUsers}
                style={{
                    marginBottom: '16px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                }}
            >
                🔄 Fetch ใหม่
            </button>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map((user) => (
                    <li key={user.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <strong>{user.firstName} {user.lastName}</strong> — {user.email}
                        <br />
                        <small>ID: {user.id} | Age: {user.age} | Gender: {user.gender}</small>
                    </li>
                ))}
            </ul>

            <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
                Data fetched at: {fetchedAt}
            </p>
        </div>
    );
}