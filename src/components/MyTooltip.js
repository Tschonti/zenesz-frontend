import ReactTooltip from 'react-tooltip'
import { isMobile } from 'react-device-detect'

const MyTooltip = () => {
    if (isMobile) {
        return null
    }
    return <ReactTooltip effect="solid" />
}

export default MyTooltip
