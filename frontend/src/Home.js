function Home() {
    return ( 
        <>
        <h2>Home page</h2>
        {JSON.parse(sessionStorage.getItem("user"))?JSON.parse(sessionStorage.getItem("user")).name:""}
        </>
     );
}

export default Home;