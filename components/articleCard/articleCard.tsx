// General
import React, { useContext } from 'react'

// Assets from Material-UI
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

// Components
import { ArticleCardBase } from '.'
import { HeaderWithIcon } from '..'


// Content included within the ArtileCardBase which contains all the information about the article
export const ArticleCard : React.FC<{}> = (props)  => {
    return (
        <ArticleCardBase>
            {/* Title*/}
            <p className="text-white text-lg mb-3">
                Jordan Peterson says curling is amazing!
            </p>

            {/* Headers*/}
            <div className="grid grid-rows-4 gap-1">
                <HeaderWithIcon
                    icon={<PersonIcon style={{color: "grey"}}/>}
                    title="Stephanie Miller (BBC)"
                />

                <HeaderWithIcon
                    icon={<AccessTimeIcon style={{color: "grey"}}/>}
                    title="22 January 2022"
                />
            </div>


            {/* Abstract */}
            <div className="mt-5">
                <p className="text-white text-sm">
                    Jordan Peterson is really a great person, as we can see by the fact that he is saying curling is a great sport. Whouhou!! We will...
                </p>
            </div>
        </ArticleCardBase>
    )
}