import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import EditableSpan from './EditableSpan';

type AddItemFormType = {
    addItem: (newItem: string) => void
}

const AddItemForm = memo((props: AddItemFormType) => {
    console.log('AddItemForm rendering')
    const [itemName, setItemName] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (itemName.trim()) {
            props.addItem(itemName)
            setItemName('')
            error && setError(null)
        } else setError('Write something')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setItemName(e.currentTarget.value)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }

    return (
        <div>
            <input value={itemName} onChange={onChangeHandler} onKeyDown={onEnterHandler}/>
            <button onClick={addItem}>Add item</button>
            {error && <span>{error}</span>}
        </div>
    );
})

export default AddItemForm;