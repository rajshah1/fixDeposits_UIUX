import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
const useUnsavedChangesWarning = (
    message = "You have unsaved changes, are you sure you want to leave?"
) => {
    const [isDirty, setDirty] = useState(false);

    useEffect(() => {
        //Detecting browser closing
        window.onbeforeunload = isDirty && (() => message);

        return () => {
            window.onbeforeunload = null;
        };
    }, [isDirty]);

    const routerPrompt = <Prompt when={isDirty} message={message} />;

    return [routerPrompt, () => setDirty(true), () => setDirty(false)];
};

export default useUnsavedChangesWarning;