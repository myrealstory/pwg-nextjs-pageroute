import { ViewPostContainer } from "@/components/ViewPostContainer";
import { StoryData } from "@/types/HomePageTypes";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_Post}/view/${id}`);
    const storyData = await response.json();

    if(!response.ok){
        return {
            notFound: true,
        };
    }

    return {
        props: {
            id,
            storyData,
        },
    }
}

const ViewPostPage = ({ id, storyData }: { id: string; storyData: StoryData }) => {
    return <ViewPostContainer id={id} storyData={storyData} />;
};

export default ViewPostPage;