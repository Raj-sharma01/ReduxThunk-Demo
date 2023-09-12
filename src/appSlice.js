// appSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const incrementCounter = createAsyncThunk('app/incrementCounter', async () => {
  return await new Promise((resolve) => setTimeout(() => resolve(1), 1000));
});

export const decrementCounter = createAsyncThunk('app/decrementCounter', async () => {
  return await new Promise((resolve) => setTimeout(() => resolve(-1), 1000));
});

/*
we can also use this syntax--

The first argument (arg or '_') is typically used to pass data or parameters to your async thunk function if needed. If you don't need to pass any data, you can use an underscore _ as a placeholder.

The second argument (thunkAPI) is essential for accessing various Redux Toolkit features, including dispatch, getState, and rejectWithValue. This argument is required to use rejectWithValue.

export const fetchData = createAsyncThunk('data/fetchData', async (_, thunkAPI) => {
  try {
    const data = await fetchDataFromApi();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
*/


/*
When the promise is resolved, Redux Toolkit automatically dispatches two actions:
One with the type 'app/incrementCounter/pending' to indicate that the async operation is pending (loading state).
Another with the type 'app/incrementCounter/fulfilled' and a payload of 1 to indicate that the async operation has been completed successfully
*/

const initialState = {
  count: 0,
  status: 'idle',
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementCounter.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(incrementCounter.fulfilled, (state, action) => {
        state.count += action.payload;
        state.status = 'succeeded';
      })
      .addCase(decrementCounter.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(decrementCounter.fulfilled, (state, action) => {
        state.count += action.payload;
        state.status = 'succeeded';
      })
      .addMatcher(
        (action) => action.type.startsWith('app/incrementCounter') || action.type.startsWith('app/decrementCounter'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, action) => {
          state.status = 'idle';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('fulfilled'),
        (state) => {
          state.status = 'idle';
        }
      );
  },
});

/*
In the provided code, addMatcher is used to handle action types that start with 'app/incrementCounter' or 'app/decrementCounter' by setting the state's status and error properties. This avoids having to write separate addCase blocks for each action type.

While you can achieve similar functionality using addCase, addMatcher provides a more concise way to handle multiple action types that follow a specific pattern. It's especially useful when you have many actions with similar behavior.
*/

export default appSlice.reducer;
