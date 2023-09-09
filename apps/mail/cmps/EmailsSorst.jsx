

export function EmailsSort({ setSortKey }) {



    return (
        // <input value={'from'} onChange={() => setSortKey('from')} type="checkbox" name="from" />
       <form action="">
        <label htmlFor="from">from</label>
       <input onChange={() => setSortKey('from')} type="radio" name="sort" id="from" />
       <label htmlFor="SentAt">date</label>
       <input onChange={() => setSortKey('sentAt')}type="radio" name="sort" id="SentAt" />
       </form>
                    )
}