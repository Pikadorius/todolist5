import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan = memo((props: EditableSpanType) => {
    console.log('EditableSpan rendering')
    const [isEditMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)
    const [error, setError] = useState<string | null>(null)

    const editItem = () => {
        if (newTitle.trim()) {
            props.onChange(newTitle)
            error && setError(null)
        } else setError('Write something')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            editItem()
            setEditMode(false)
        }
    }

    const onBlurHandler = () => {
        editItem()
        setEditMode(false)
    }

    return (
        isEditMode
            ? <input
                autoFocus
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyDown={onEnterHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{newTitle}</span>

    );
})

export default EditableSpan;