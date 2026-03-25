'use client';

import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import styles from './UserList.module.css';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    phone: string;
};

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState<number>(0);

    const fetchUsers = async (skipValue: number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `https://dummyjson.com/users?limit=3&skip=${skipValue}`
            );

            if (!res.ok) throw new Error('Failed to fetch users');

            const data = await res.json();
            setUsers(data.users);
        } catch (err) {
            setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // โหลดข้อมูลครั้งแรก
    useEffect(() => {
        fetchUsers(0);
    }, []);

    const handleNext = () => {
        const newSkip = skip + 3;
        setSkip(newSkip);
        fetchUsers(newSkip);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>User Directory</h1>

            {loading && <p className={styles.loading}>กำลังโหลดผู้ใช้...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && (
                <>
                    <div className={styles.userGrid}>
                        {users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className={styles.nextButton}
                        disabled={loading}
                    >
                        แสดงผู้ใช้ถัดไป →
                    </button>
                </>
            )}
        </div>
    );
}