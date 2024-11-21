
export const HeaderInline = ({labelName,error,className}:{labelName: string;error:boolean,className?:string}) =>{
    return (
        <div className={`mb-2 ${className}`}>
            <label htmlFor={labelName} className={`${error? "text-warning":"text-purple"} text-md`}>
                {labelName}
            </label>
        </div>
    )
}
