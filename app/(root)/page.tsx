import { auth } from "@/auth";


const Home = async() => {

  const session = await auth();
  console.log("session",session)
  return (
    <>
    <h1 className="text-3xl to-blue-700">HELLO EVERONE!</h1>
    <br /><br /><br /><br /><br />
    <h2>Helloo is it working</h2>
    </>
  );
}


export default Home;