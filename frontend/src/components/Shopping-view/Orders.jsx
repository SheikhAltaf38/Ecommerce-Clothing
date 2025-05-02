import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const Orders = () => {
  return (
  
      <Card className="my-5">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Orders</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent >
          <Table >
            <TableCaption>Order History</TableCaption>
            <TableHeader>
              <TableRow className="">
                <TableHead className='font-bold text-black'>Order ID</TableHead>
                <TableHead className='font-bold text-black'>Order Date</TableHead>
                <TableHead className='font-bold text-black'>Order Status</TableHead>
                <TableHead className='font-bold text-black'>Order Total</TableHead>
                <TableHead className='font-bold text-black'>Order Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#12345</TableCell>
                <TableCell>2022-01-01</TableCell>
                <TableCell> 
                 <Badge>Confirmed</Badge> </TableCell>
                <TableCell>$100.00</TableCell>
                <TableCell><Button className="" size='sm' >
                View Details </Button> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  
  )
}

export default Orders