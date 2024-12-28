

function SearchRow({defaultValue, onChange}) {
  
  return (
    <div className='flex flex-col gap-y-2'>
      <label htmlFor='search' className=' capitalize'>
        search
      </label>
      <input
        type='search'
        id='search'
        name='search'
        defaultValue={defaultValue}
        onChange={onChange}
        className='border-2 border-[#e4e4e4] outline-none p-3 rounded-md'
      />
    </div>
  );
}

export default SearchRow;
