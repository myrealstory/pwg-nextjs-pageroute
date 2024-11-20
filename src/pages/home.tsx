import HomePage from "@/components/HomePage";
import { HomePageProps, IndexDataType } from "@/types/HomePageTypes";
import { GetServerSideProps } from "next";


const Home = (props: HomePageProps) => {
  return <HomePage {...props}/>
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if(!token){
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  try {
    // Determine the host dynamically
    const protocol = context.req.headers.host?.includes("localhost") ? "http" : "https";
    const host = context.req.headers.host || "localhost:3000"; // Fallback to localhost:3000
    const baseUrl = `${protocol}://${host}`;

    const currentPage = parseInt(context.query.page as string) || 1;

    const response = await fetch(`${baseUrl}/api/home?page=${currentPage}`, {
      headers: { cookie: context.req.headers.cookie || ""},
    });

    if(!response.ok){
      throw new Error("Unauthorized. Please log in.");
    }

    const { data , adminMode, totalAccount, totalPosts } = await response.json();

    return {
      props: {
        data,
        modal: {type: "", show:false , message:""},
        adminMode,
        totalAccount,
        totalPosts,
        currentPage,
        serverToken: token,
      }
    }
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

export default Home;