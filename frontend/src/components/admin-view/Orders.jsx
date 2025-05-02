import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Dialog } from '../ui/dialog'
import { Button } from '../ui/button'
import OrderDetails from './orderDetails'

const Orders = () => {
    const [ openDetailsDialog,setOpenDetailsDialog] = useState(false)
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1 className='text-xl font-bold text-center' >All Orders</h1>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID </TableHead>
                            <TableHead>Order Date </TableHead>
                            <TableHead>Order Status </TableHead>
                            <TableHead>Order Price </TableHead>
                            <TableHead className="sr-only">Details </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>278382</TableCell>
                            <TableCell>12/12/1222</TableCell>
                            <TableCell>confirmed</TableCell>
                            <TableCell>999</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog} >
                                   <Button onClick={()=>setOpenDetailsDialog(true)} >
                                     View Details
                                   </Button>
                                   <OrderDetails/>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}

export default Orders