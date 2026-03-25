import React from 'react';
import styles from './UserCard.module.css';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    phone: string;
};

type UserCardProps = {
    user: User;
};

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className={styles.card}>
            <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className={styles.avatar}
            />
            <div className={styles.info}>
                <h2 className={styles.name}>
                    {user.firstName} {user.lastName}
                </h2>
                <p className={styles.email}>{user.email}</p>
                <p className={styles.phone}>{user.phone}</p>
            </div>
        </div>
    );
}