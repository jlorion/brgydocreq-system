import React from 'react';
import CheckIcon from '../../../assets/Check.png';
import XIcon from '../../../assets/x.png';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface CustomAdminTableProps {
    tableCellData: Array<{
        referenceID: string;
        requesterName: string;
        barangayPosition: string;
        requestedRole: string;
    }>;
    onApprove: (referenceID: string) => void;
    onReject: (referenceID: string) => void;
}

const CustomAdminTable: React.FC<CustomAdminTableProps> = ({ tableCellData, onApprove, onReject }) => {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-36">Reference ID</TableHead>
                    <TableHead className="w-54">Requester's Name</TableHead>
                    <TableHead className="w-36">Barangay Position</TableHead>
                    <TableHead className="w-36">Requested Role</TableHead>
                    <TableHead className="w-36 text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableCellData.map((data) => (
                    <TableRow key={data.referenceID} className="gap-y-5">
                        <TableCell>{data.referenceID}</TableCell>
                        <TableCell>{data.requesterName}</TableCell>
                        <TableCell>{data.barangayPosition}</TableCell>
                        <TableCell>{data.requestedRole}</TableCell>
                        <TableCell className="text-center">
                            <Button variant="empty" className="rounded-sm hover:bg-blue-200" onClick={() => onApprove(data.referenceID)}>
                                <img src={CheckIcon} alt="" />
                            </Button>
                            <Button variant="empty" className="rounded-sm hover:bg-red-200" onClick={() => onReject(data.referenceID)}>
                                <img src={XIcon} alt="" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CustomAdminTable;
