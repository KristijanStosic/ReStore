import { Typography, ButtonGroup, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { decrement, increment } from './counterSlice'

export default function ContactPage() {
  const dispatch = useAppDispatch()
  const { data, title } = useAppSelector(state => state.counter)

  return (
    <>
    <Typography variant='h2'>
      {title} {data}
    </Typography>
    <ButtonGroup>
      <Button onClick={() => dispatch(increment(5))} variant='contained' color='primary'>Increment</Button>
      <Button onClick={() => dispatch(decrement(3))} variant='contained' color='error'>Decrement</Button>
    </ButtonGroup>
  </>
  )
}
