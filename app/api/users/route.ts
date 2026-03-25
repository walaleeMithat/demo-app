import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const res = await fetch('https://dummyjson.com/users?limit=5');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();

        return NextResponse.json({ users: data.users });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}