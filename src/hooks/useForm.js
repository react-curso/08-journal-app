import { useState } from "react"

export const useForm = ( initialState = {} ) => {

    const [formValue, setFormValue] = useState(initialState)

    const handleChange = ({target}) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    const reset = ( newFormState = initialState) => {
        setFormValue(newFormState);
    }

    return {
        formValue,
        handleChange,
        reset
    }

}
