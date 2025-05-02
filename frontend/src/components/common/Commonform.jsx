import { ContactRound } from 'lucide-react'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const Commonform = ({
    formcontrols,
    formData,
    setFormData, onSubmit , btnText , isBtnDisabled
}) => {
    function renderInputsByComponentType(getControlItem){
        const value = formData[getControlItem.name] || "";
        let element = null;

        switch (getControlItem.componentType) {
            case "input":
              element=(
                <Input className=""
                   type={getControlItem.type}
                    placeholder={getControlItem.placeholder}
                    value={value}
                    id={getControlItem.name}
                    name={getControlItem.name}
                    onChange={(e)=>{
                        setFormData({
                            ...formData , 
                            [getControlItem.name]: e.target.value
                        })
                    }}/>
                 )
                break;
            case "select" :
                element=(
                    <Select value={value}
                     onValueChange={(value)=>{
                        setFormData({
                            ...formData,
                            [getControlItem.name]: value
                     })
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={getControlItem.label}
                             /> 
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length >0 ?
                             getControlItem.options.map((option)=>(
                                 <SelectItem value={option.id} key={option.id}>
                                  {option.label}
                                  </SelectItem>
                             ))
                            :null}
                        </SelectContent>
                    </Select>
                )
                break;
            case "textarea":
                element =(
                    <Textarea placeholder={getControlItem.placeholder}
                    name={getControlItem.name}
                    id={getControlItem.id}
                    value={value}
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            [getControlItem.name]: e.target.value
                        })
                    }} />
                )
                break;
            default:
                element=(
                    <Input type={getControlItem.type}
                        placeholder={getControlItem.placeholder}
                        value={value}
                        id={getControlItem.id}
                        name={getControlItem.name}
                        onChange={(e)=>{
                            setFormData({
                                ...formData , 
                                [getControlItem.name]: e.target.value
                            })
                        }}/>
                     )
                break;
        }
    return element
    }
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {formcontrols.map((controlItem)=>(
            <div key={controlItem.name}
             className=''>
                <Label className="text-md font-bold">
                    {controlItem.label}</Label>
                {renderInputsByComponentType(controlItem)}
            </div>
        ))}
      </div>
      <div className='text-center my-4'>
        <Button type="submit" disabled={isBtnDisabled} 
        className="hover:scale-105 translate-all duration-150 " >
        {btnText || "submit"} 
        </Button>
      </div>
    </form>
  )
}

export default Commonform