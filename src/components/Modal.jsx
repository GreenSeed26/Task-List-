import { Close } from '@mui/icons-material'
import React, { Component } from 'react'

export default class Modal extends Component {
  render() {

    return (
      <div className='fixed top-0 bg-black/50 w-screen h-screen z-[9999999999]'>
        <div className='relative my-60 m-auto bg-white w-72 max-h-72 p-3 rounded-xl shadow-md ring ring-black/10'>
          <button className=' absolute right-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors' onClick={this.props.close}><Close className='text-white' /></button>

          <h1 className='text-2xl'>Task</h1>
          <div className='m-1 p-2 border rounded max-h-52  overflow-auto scrollbar'>
            <span>
              {this.props.text}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
