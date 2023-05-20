import colab from '../../assets/Google_Colaboratory_SVG_Logo.svg'
import warning from '../../assets/warning-circle-svgrepo-com.svg'

import { useContext } from "react";
import DarkModeContext from "../../context/DarkModeContext";

export default function Tag(props: { tag: string }) {

    const darkModeContext = useContext(DarkModeContext);

    if (props.tag === 'colab') {
        return <img className='tag-logo' src={colab} alt="Google Colab logo" title='Google Colab' />;
    }
    if (props.tag === 'flash-warning' && darkModeContext.isDarkMode) {
        return <img className='tag-logo' src={warning} alt="Warning sign" title='Осторожно, без тёмной темы' />;
    }
    if (props.tag === 'no-mobile') {
        return <span className='tag-strikethrough' title='Не расчитан на мобильный'>📱</span>;
    }
    return null;
}