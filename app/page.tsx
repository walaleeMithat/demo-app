"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div style={{ padding: 20 }}>
            <h1>🏠 Home Page</h1>

            <Link href="/usersList">
                <button>ไปหน้า Users</button>
            </Link>
        </div>
    );
}