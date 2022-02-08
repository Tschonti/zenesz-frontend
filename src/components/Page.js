import { useEffect } from 'react'

const Page = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [props.path])
    return props.children
}

export default Page