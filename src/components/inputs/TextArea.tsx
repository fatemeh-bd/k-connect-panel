import { FC } from "react"
import { TextAreaType } from "./types"
import { inputClass } from "../../utils/enums"

const TextArea:FC<TextAreaType>=({className,...rest})=>{
return(
    <textarea className={`resize-none min-h-[180px] ${inputClass} ${className}`} {...rest}/>
)
}
export default TextArea