import React, { useState, useEffect } from 'react';
import { Remove, ReplyTwoTone, TempleBuddhist } from '@mui/icons-material';
import Modal from './components/Modal';

function App() {
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem('lists');
    return storedList ? JSON.parse(storedList) : [];
  });
  const [text, setText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(list));
  }, [list]);

  const handletTextInput = (e) => {
    setText(e.target.value);
  };

  const createList = (e) => {
    e.preventDefault();

    if (text.trim() !== '') {
      setList((curr) => {
        return [
          ...curr,
          {
            id: Date.now(),
            text: text,
          },
        ];
      });
    }

    setText('');
  };

  function removeList(index) {
    const deleteList = list.filter((_, i) => i !== index);
    setList(deleteList);
  }

  function moreInfo(listItem) {
    setSelectedItem(listItem);
    setModal(true);
  }

  return (
    <>
      {modal && <Modal text={selectedItem} close={() => setModal(false)} />}
      <form
        onSubmit={createList}
        className='bg-slate-200 border rounded w-80 my-6 px-2 py-4 flex flex-col m-auto md:w-96 '
      >
        <h1 className='text-center text-3xl py-3'>Todo-List</h1>
        <input
          onChange={handletTextInput}
          value={text}
          className='w-56 h-8 m-auto rounded px-1 focus:outline-0 border border-gray-300 placeholder:text-sm '
          type='text'
          placeholder='Create List'
        />
        <button className='h-7 w-20 m-auto mt-4 bg-lime-400 rounded text-sm font-semibold hover:bg-lime-500 transition-colors '>
          Add List
        </button>
      </form>

      <div className='bg-gray-200 w-80 m-auto p-2 rounded border border-gray-500 md:w-96'>
        <h1 className='text-xl text-center'>Tasks</h1>
        <ul className='bg-white overflow-auto h-48 scrollbar'>
          {list.map((lists, index) => {
            return (
              <li key={lists.id} >
                <div
                  className='relative flex h-8 items-center px-2 border-b bg-gray-300 cursor-default'>
                  <span onClick={() => moreInfo(lists.text)}
                    className='hover:cursor-pointer hover:underline hover:text-indigo-700'>{lists.text.length >= 34 ? lists.text.slice(0, 34) + '...' : lists.text}</span>
                  <button
                    onClick={() => removeList(index)}
                    className='bg-red-500 flex items-center rounded-md absolute right-1 z-[9999] hover:bg-red-300 transition-colors'>
                    <Remove fontSize='small' />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
