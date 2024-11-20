"use client";

import {useEffect, useState } from "react";
// import withRoleBaseFetching from "@/utils/HomePageHOC";
import moment from "moment";
import { HomePageProps, ModalType, ModModalType, WrappedComponentProps } from "@/types/HomePageTypes";
import { PopupContainer } from "./PopupContainer";
import { useRouter } from "next/navigation";
import { FaCircle } from "react-icons/fa";

const AdminDashBox = ({
    amount, title, containerStyle,toogle, activeBar, index ,yesterday
}:{
    amount:number, 
    title:string, 
    containerStyle?:string
    toogle:()=>void,
    activeBar:number,
    index:number,
    yesterday:number,
}) =>{
    return (
        <div 
            className={`flex items-center justify-center rounded-xl md:py-5 py-3 px-10 gap-10 box-border w-full duration-500 transform relative overflow-hidden ${containerStyle}`}
            onClick={toogle}
            style={{
                width: activeBar === index ? "":"300px",
                justifyContent: activeBar === index ? "start":"center",
            }}
            >
            <div className="flex flex-col"
                 style={{
                    alignItems: activeBar === index ? "start":"center",
                }}
            >
                <p className="text-black md:text-lg text-md mb-2 text-nowrap">{title}</p>
                <p className="lg:text-[3rem] text-[2rem] lg:leading-[3rem] leading-[2rem] text-black font-medium text-center mb-2">{amount}</p>
            </div>
            <div 
                className="flex flex-col justify-start pb-6 overflow-hidden duration-700 transform"
                style={{
                    // width: activeBar === index ? "200px":"0px",
                    opacity: activeBar === index ? "1":"0",
                }}
                >
                <p className="text-black text-sm mb-2">Compare with yesterday</p>
                <p className={`text-right text-xl ${yesterday > amount ? "text-btnRedHover":"text-forestGreen"}`}>{((amount/yesterday)*100).toFixed(2)}%</p>
            </div>
            <FaCircle 
                className="text-white text-[10rem] duration-500 transform absolute bottom-0 right-0 opacity-30"
                style={{
                    transform: activeBar === index ? "translate(45%,45%)":"translate(50%,50%)",
                }}
                />
        </div>
    );
}


const HomePage: React.FC<HomePageProps> = ({
    data,
    modal,
    adminMode,
    currentPage,
    totalAccounts,
    totalPosts,
    serverToken,
}) =>{
    const [modModal, setModModal] = useState<ModalType>({
        type: "",
        show: false,
        id: 0,
    });
    const [activeBar, setActiveBar] = useState(1);
    const router = useRouter();

    useEffect(()=> {
        if(serverToken !== ""){
            localStorage.setItem("token", serverToken);
        };
    },[serverToken])

    const triggerModal = (type:ModModalType["type"], show:boolean, id?:number) => {
        setModModal({type, show, id});
    }

    const triggerLogout = () => {
        localStorage.removeItem("token");
        window.location.href="/";
    }

    const  PaginationBox =() =>{
        if(!data || !data.totalPages) return null;

        const page = Array.from({ length: data.totalPages },(_, i) => i +1 );

        const changePage = (page: number) => {
            // Update the Url and trigger SSR
            const query = new URLSearchParams(window.location.search);
            query.set("page", page.toString());
            window.location.search = query.toString(); // This will trigger SSR refetch
        }

        return (
            <div className="flex justify-center items-center gap-3">
                {page.map(page => (
                        <button 
                            key={page}
                            className={`text-sm ${currentPage === page ? "bg-primaryYellow text-white":"bg-white text-black/60"}  text-center px-3 py-2 rounded-lg`}
                            onClick={()=>changePage(page)}
                        >
                            {page}
                        </button>
        
                    ))}
            </div>
        )

    }

    if (!data || !data.data) return null;

    return (
        <div className="mx-auto flex flex-col items-center pt-8 mb-[10rem] w-full 2xl:max-w-[1380px] lg:max-w-[80%] md:max-w-[70%] h-full px-4">
            <div className=" flex items-center justify-between mb-6 w-full">
                <button
                    className="bg-primaryYellow text-white md:py-2 md:px-8 rounded-full py-1 px-3 text-sm"
                    onClick={() => triggerModal("add",true, 0)}
                >
                    Add New Post
                </button>
                <button
                    className="text-xl text-warning"
                    onClick={triggerLogout}
                >
                    Logout
                </button>
            </div>
            <h4
                className={"text-black text-2xl font-medium text-center mb-10"}
            >
                Post List
            </h4>
            {adminMode === true && (
                <div className="flex md:gap-10 sm:gap-8 gap-4 w-full md:mb-16 mb-6">
                    <AdminDashBox 
                        title={"Total Amount"} 
                        amount={totalAccounts ?? 0}
                        containerStyle="bg-tagColor"
                        index={1}
                        activeBar={activeBar}
                        toogle={()=>setActiveBar(1)}
                        yesterday={150}
                        />
                    <AdminDashBox 
                        title={"Total Posts"} 
                        amount={totalPosts ?? 0}
                        containerStyle="bg-red"
                        index={2}
                        activeBar={activeBar}
                        toogle={()=>setActiveBar(2)}
                        yesterday={70}
                        />   
                    <AdminDashBox 
                        title={"My Posts"} 
                        amount={data.totalPosts}
                        containerStyle="bg-primaryGreen"
                        index={3}
                        activeBar={activeBar}
                        toogle={()=>setActiveBar(3)}
                        yesterday={10}
                        />   
                </div>
            )}
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full mb-16 gap-6">
                {data.data.map(item =>(
                    <div 
                        key={item.id}
                        className="bg-white rounded-2xl py-6 px-8 w-full h-auto flex flex-col gap-1"
                        onClick={()=> router.push(`/viewPost/${item.id}`)}    
                    >   
                        <p className="text-primaryYellow text-sm mb-2">{moment(item.date).format("YYYY.MM.DD")}</p>
                        <div className="flex items-center gap-2 mb-2 w-full flex-wrap">
                            {item.tags.map((tag,index) =>(
                                <div className="bg-hoverOrange rounded-full text-center px-3 py-1 flex text-[0.6rem] font-medium" key={index}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <h4 className="text-lg ">{item.title}</h4>
                        <p className="max-h-[80px] text-base multiline-truncate mb-4" dangerouslySetInnerHTML={{ __html:item.body}}/>
                        <div className="flex items-center justify-between gap-2">
                            <button 
                                className="2xl:mr-2 bg-blue hover:bg-csname text-white px-5 py-1 rounded-full text-center text-sm"
                                onClick={()=>triggerModal("edit", true,item.id)}
                            >
                                Edit
                            </button>
                            
                            <button 
                                className=" bg-warning hover:bg-btnRedHover hover:text-white px-5 py-1 rounded-full text-center text-sm"
                                onClick={()=>triggerModal("delete", true,item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

            </div>
            {PaginationBox()}
            {(modal.show === true || modModal.show === true) && 
                <PopupContainer
                    modModal={modModal}
                    modal={modal}
                    triggerModal={triggerModal}
                    data={data.data ?? []}
                /> 
            }
            
        </div>
    );
}

export default HomePage;