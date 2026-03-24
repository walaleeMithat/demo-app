'use client'

import { useEffect, useState } from 'react'

type User = {
    id: number
    firstName: string
    lastName: string
}

export default function Page() {
    const [users, setUsers] = useState<User[]>([])
    const [refresh, setRefresh] = useState(0)
    const [mounted, setMounted] = useState(true)

    return (
        <div style={{ padding: 20 }}>
            <h1>Lifecycle</h1>

            <button onClick={() => setRefresh(prev => prev + 1)} style={{backgroundColor:'#88e788'}}>
                🔄 Random ใหม่ (Update)
            </button>

            <button
                onClick={() => setMounted(false)}
                style={{ marginLeft: 10, backgroundColor: 'yellow' }}
            >
                ❌ Unmount
            </button>

            {mounted && <UserList users={users}
                                  setUsers={setUsers}
                                  refresh={refresh}
            />}
        </div>
    )
}

function UserList({
                      users,
                      setUsers,
                      refresh,
                  }: {
    users: User[]
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
    refresh: number
}) {
    const fetchUsers = async () => {
        const randomSkip = Math.floor(Math.random() * 100)

        const res = await fetch(`https://dummyjson.com/users?limit=3&skip=${randomSkip}`)
        const data = await res.json()

        setUsers(data.users)
        console.log(data.users)
    }

    // Mount + Unmount
    useEffect(() => {
        console.log('🟢 Mount: โหลดครั้งแรก')

        fetchUsers()

        return () => {
            console.log('🔴 Unmount: component ถูกลบ')
        }
    }, [])

    // Update (เมื่อกด random)
    useEffect(() => {
        if (refresh > 0) {
            console.log('🟡 Update: refresh =', refresh)
            fetchUsers()
        }
    }, [refresh])

    // POST
    const addUser = async () => {
            const res = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: 'Cat',
                    lastName: 'Dog'
                })
            })

            const data = await res.json()
            console.log('✅ POST success:', data)
    }

    // PUT
    const updateUser = async (id: number) => {
        try {
            const res = await fetch(`https://dummyjson.com/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName: 'NewCat', lastName: 'Dog' }),
            });

            const updatedUser = await res.json();
            console.log('✏️ PUT success:', updatedUser);

            // อัพเดท state ทันที (Optimistic Update)
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id
                        ? { ...user, firstName: 'NewCat', lastName: 'Dog' }   // หรือ {...updatedUser} ก็ได้
                        : user
                )
            )

        } catch (error) {
            console.error('Update failed:', error);
        }
    }

    return (
        <div style={{ marginTop: 20 }}>
            <h2> Random Users (3 คน)</h2>
            {users.map(user => (
                <div key={user.id} style={{ marginBottom: 20 }}>
                    <p>
                        {user.firstName} {user.lastName}
                    </p>
                    <button onClick={() => updateUser(user.id)} style={{ marginLeft: 5, backgroundColor: '#ffcccb' }}>
                        Edit
                    </button>
                </div>
            ))}

            <button onClick={addUser} style={{ backgroundColor: '#87cefa' }}>
                ➕ Add User (POST)
            </button>
        </div>
    )
}