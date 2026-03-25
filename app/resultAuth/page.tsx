interface ResultAuthProps {
    searchParams:Promise<{
        email: string;
        password: string;
    }>;
}

export default async function ResultAuthPage({ searchParams }: ResultAuthProps) {

    const params =await searchParams

    const email = params.email;
    const password = params.password;

    return (

        <div style={{ padding: '30px' }}>
            <h1>Result Auth</h1>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Password:</strong> {password}</p>

        </div>
    );
}


// interface ResultAuthProps {
//     searchParams: {
//         email?: string;
//         password?: string;
//     };
// }
//
// export default function ResultAuthPage({ searchParams }: ResultAuthProps) {
//
//     const email = searchParams.email;
//     const password = searchParams.password;
//
//     return (
//         <div style={{ padding: '30px' }}>
//             <h1>Result Auth</h1>
//             <p><strong>Email:</strong> {email}</p>
//             <p><strong>Password:</strong> {password}</p>
//         </div>
//     );
// }