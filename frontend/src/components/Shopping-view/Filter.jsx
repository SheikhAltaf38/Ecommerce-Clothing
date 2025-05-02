import React from 'react'
import { filterOptions } from '@/config'
import { Label } from '../ui/label'
import { SelectLabel } from '../ui/select'
import { Separator } from '../ui/separator'
import { Checkbox } from '../ui/checkbox'
const Filter = ({filters, handleFilter}) => {
  return (
    <div className='border-r-1 min-h-screen mt-1 shadow-sm rounded-lg '>
      {Object.keys(filterOptions).map((keyItem)=>(
        <div className='w-32 sm:w-36 shrink' key={keyItem}>
          <div className='flex justify-center mb-2 '>
            <p className='font-bold text-xl'>{keyItem.toUpperCase()}</p>
           
          </div>
          <div className='flex flex-col w-full gap-2 mb-4'>
            {filterOptions[keyItem].map((options)=>(
              <Label className=" flex ml-3 gap-3 items-center text-md font-semibold hover:bg-muted hover:text-foreground hover:scale-105 transition-all duration-150 
              cursor-pointer" key={options.id}>
                  <Checkbox checked={
                    filters && Object.keys(filters).length >0 
                    && filters[keyItem] && filters[keyItem].indexOf(options.id) > -1
                  } onCheckedChange={()=>{handleFilter(keyItem,options.id)}}/>
                  {options.label}    
              </Label>
            ))}
          </div>
          <Separator/>
        </div>
      ))}
    </div>
  )
}

export default Filter