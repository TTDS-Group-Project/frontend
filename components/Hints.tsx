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

    return (
        <div>
            <div className="mb-5">
                {displayActionButton()}
            </div>

            {hintsActive && (
                <div className="bg-tag-bg-color text-tag-text-color rounded-md px-5 py-2">
                    <p className="font-bold">Cache:</p>
                    <ul className="list-disc pl-10">
                        <li className="">The search module caches recent queries for a short period of time, to bypass this cache tick this box</li>
                    </ul>

                    <br></br>

                    <p className="font-bold">Queries:</p>
                    <ul className="list-disc pl-10">
                        <li className="">Use a freetext as you normally would. To use a boolean, phrase or proximity search - or a combination of them all - surround your query with a “[]”. Please note you may not specify a ranking algorithm or use query expansion with a boolean-type search.</li>
                        <li className="">For instance, you may use n-word phrase search with a boolean conjunctive as so: [”ttds group project” AND pain]</li>
                    </ul>
                    
                </div>
            )}
        </div>
    )
}