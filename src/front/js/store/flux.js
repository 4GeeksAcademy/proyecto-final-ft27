const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            token: localStorage.getItem('token') || null,
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            login: async (email, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
                    const data = await resp.json();
                    
                    if (resp.ok) {
                        setStore({ 
                            user: data.user,
                            token: data.access_token 
                        });
                        localStorage.setItem('token', data.access_token);
                        return true;
                    } else {
                        setStore({ message: data.error });
                        return false;
                    }
                } catch (error) {
                    console.error("Login error", error);
                    return false;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                setStore({ 
                    user: null,
                    token: null 
                });
            },

            checkUser: async () => {
                const token = localStorage.getItem('token');
                if (!token) return;

                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/user/profile", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ user: data });
                    } else {
                        getActions().logout();
                    }
                } catch (error) {
                    console.error("Check user error", error);
                    getActions().logout();
                }
            },

            getMessage: async () => {
                try{
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    return data;
                }catch(error){
                    console.log("Error loading message from backend", error)
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;