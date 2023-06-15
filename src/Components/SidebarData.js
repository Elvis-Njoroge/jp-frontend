import React from 'react' 
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const SidebarData = [
    {
        title:'Home',
        icon:<HomeIcon/>,
        link:'/home'
    },
    {
        title:'Assets',
        icon:<AssessmentIcon/>,
        link:'/assets'
    },  
    {
        title:'Goals',
        icon:<CalculateIcon/>,
        link:'/goals'
    },
    {
        title:'Budget',
        icon:<AccountBalanceIcon/>,
        link:'/budget'
    },
    {
        title:'Expenses',
        icon:<AccountBalanceWalletIcon/>,
        link:'/expenses'
    }
]