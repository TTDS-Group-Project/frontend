import React, {useState} from 'react'
import {ActionButton} from "."

export const Hints: React.FC<{}> = () => {
    const [hintsActive, setHintsActive] = useState(false)

    const displayActionButton = () => {
        if (hintsActive) {
            return (
                <ActionButton onClick={() => setHintsActive(!hintsActive)}>
                    Hide search guidance
                </ActionButton>
            )
        } else {
            return (
                <ActionButton onClick={() => setHintsActive(!hintsActive)}>
                    Show search guidance
                </ActionButton>

            )
        }
    }


    const Label: React.FC<{label: string}> = ({label}) => (
        <p className="font-bold underline text-lg">{label}</p>
    )

    const BulletedList: React.FC<{children: React.ReactNode}> = ({children}) => (
        <ul className="list-disc pl-10">
            {children}
        </ul>
    )


    return (
        <div>
            <div className="mb-5">
                {displayActionButton()}
            </div>

            {hintsActive && (
                <div className="bg-tag-bg-color text-tag-text-color rounded-md px-5 py-2">
                    <Label label="Phrase search:" />
                    <BulletedList>
                        <li>
                            Surround your query with quotation marks and square brackets. Our engine supports any N-word phrase search. For example:
                            <BulletedList>
                                <li>[“Barack Obama”]</li>
                                <li>[“Love is great and I love it”]</li>
                            </BulletedList>
                        </li>
                        <li>You cannot specify a ranking algorithm or use query expansion for proximity search</li>
                    </BulletedList>

                    <br></br>

                    <Label label="Proximity search:" />
                    <BulletedList>
                        <li>
                            Surround your query with square brackets and use the following format when for example finding “alpha” and “beta” within a distance of three:
                            <BulletedList>
                                <li>[#3(alpha,beta)]</li>
                            </BulletedList>
                        </li>
                        <li>You cannot specify a ranking algorithm or use query expansion for proximity search</li>
                    </BulletedList>

                    <br></br>

                    <Label label="Boolean search:" />
                    <BulletedList>
                        <li>
                            Surround your query with square brackets and write operators in uppercase. For example:
                            <BulletedList>
                                <li>[Barack AND Obama]</li>
                                <li>[NOT Barack]</li>
                                <li>[Barack OR Obama]</li>
                            </BulletedList>
                        </li>
                        <li>The search is left-associative and NOT binds first, so the query [A AND B AND NOT C AND D] is parsed as [A AND [B AND [[NOT C] AND D]]]</li>
                        <li>You cannot specify a ranking algorithm or use query expansion for boolean search</li>
                    </BulletedList>

                    <br></br>

                    <Label label="Freetext search:" />
                    <BulletedList>
                        <li>
                            Input a normal query, for example:
                            <BulletedList>
                                <li>this is a normal freetext query </li>
                            </BulletedList>
                        </li>
                    </BulletedList>


                    <br></br>

                    <Label label="Combined search:" />
                    <BulletedList>
                        <li>
                            If you want to write a query using phrase, proximity and boolean search together, simply surround your query with square brackets, for example:
                            <BulletedList>
                                <li>[George AND NOT Bush AND Obama AND “donald trump”]</li>
                            </BulletedList>
                        </li>
                    </BulletedList>

                    <br></br>

                    <Label label="Spell Checking:" />
                    <BulletedList>
                        <li>When searching a freetext query, our interface will suggest you a spell checked query. Simply click on the spell checked query to correct your search query.</li>
                        <li>Spell checking only works with freetext. This means that spell checking won’t be applied for phrase search, proximity search or boolean search.</li>
                    </BulletedList>
                </div>
            )}
        </div>
    )
}