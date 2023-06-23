import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

const SideBar = () => {
  const theme = useTheme()

    return (
        <>
            <Box component={'div'} sx={{ height: '100%', position: 'absolute', width: '100%', borderLeft: '1px solid #DADADA', padding: '30px 25px', backgroundColor: theme.palette.custom.light }}>
                
                    <Typography variant='headingIcon' component={'h6'}><span>FILE DETAILS</span><CreateNewFolderOutlinedIcon /></Typography>
                    <Typography variant='titleDetails' component={'p'}><small>Buyer:</small><span>Edward Williamson</span></Typography>
                    <Typography variant='titleDetails' component={'p'}><small>Seller:</small><span>Edward Williamson</span></Typography>
                    <Typography variant='titleDetails' component={'p'}><small>Lender:</small><span>Edward Williamson</span></Typography>
                    <Typography variant='titleDetails' component={'p'}><small>Transection Type:</small><span>Purchase</span></Typography>
                    <Typography variant='titleDetails' component={'p'}><small>File ID:</small><span>675</span></Typography>

                    <Typography variant='headingIcon' component={'h6'}><span>ORDER STAGE</span><CreateNewFolderOutlinedIcon /></Typography>
                    <Typography variant='stages' component={'p'} className="active">Create Order</Typography>
                    <Typography variant='stages' component={'p'}>Analyze Package</Typography>
                    <Typography variant='stages' component={'p'}>Prepare Documents</Typography>
                    <Typography variant='stages' component={'p'}>Assemble Package</Typography>
                    <Typography variant='stages' component={'p'}>Send for Closing</Typography>
                    <Typography variant='stages' component={'p'}>Send for Recording</Typography>

                    <Typography variant='headingIcon' component={'h6'}><span>HELP</span><CreateNewFolderOutlinedIcon /></Typography>
                    <Typography variant='body1' component={'p'}>20 features that wil Transfer ... Reassigned Tasks in Bulk, Individually... What can I search for in Top section? </Typography>
                
            </Box>
        </>
    )
}

export default SideBar