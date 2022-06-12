function test(a: number, b: number): number{
    return a + b;
}

test(1, 1)

interface User{
    id: string;
    name: string;
    email?: string;

    //getAdress: () => void;
    getAdress: () => string;
}

function saveUser(user:User){
    const { name } = user;
}

saveUser({
    id: '231654684',
    name: 'Marcos Lucindo',
    getAdress: () => 'a'
})