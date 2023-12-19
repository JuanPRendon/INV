import { Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <div className='flex'>
    <div className='fixed w-25 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
      <div className='flex flex-col items-center'>
      <Tooltip arrow placement="right" title="Inicio">
        <Link href='/table'>
          <div className='bg-blue-800 text-white p-3 rounded-lg inline-block'>
            <DashboardIcon size={20}/>
          </div>
        </Link>
      </Tooltip >
        <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
      <Tooltip arrow placement="right" title="Grupos">
        <Link href='/grupo'>
          <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
            <GroupsIcon size={20} color="action"/>
          </div>
        </Link>
      </Tooltip>
      <Tooltip arrow placement="right" title="Usuarios">
        <Link href='/Auralac'>
          <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
            <PersonAddIcon size={20} color="action"/>
          </div>
        </Link>
      </Tooltip>
      <Tooltip arrow placement="right" title="Materiales">
        <Link href='/login'>
          <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
            <ArticleIcon size={20} color="action"/>
          </div>
        </Link>
      </Tooltip>
      <Tooltip arrow placement="right" title="Salir">
        <Link href='/login'>
          <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
            <LogoutIcon size={20} color="action"/>
          </div>
        </Link>
      </Tooltip>
      </div>
    </div>
    <main className='ml-20 w-full bg-gray-100'>{children}</main>
  </div>
  )
}
