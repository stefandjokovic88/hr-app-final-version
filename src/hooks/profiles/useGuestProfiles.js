import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'

export const getGuestProfiles = async (sort,filter) => {
    const response = await axiosConfig.get(`/profiles?filters[company][id][$eq]=${window.location.pathname.split("/")[2]}&populate=*&filters[status]=published${sort ? `&sort=createdAt:${sort}` : ""}${filter ? `&filters[name][$containsi]=${filter}` : ""}`)
    return response
}

export default function useGuestProfiles(sort,filter){
    return useQuery(['guestProfiles',{sort,filter}],()=>getGuestProfiles(sort,filter),{
		keepPreviousData: true
	})
}