<x-layout>
    <div class="container">
    <div class='main  register'>
        <header class="text-center">
            <h2 class="sign" style="font-size:30px" align="center">
                Register
            </h2>
            <p class="sign" align="center">Create an account to your cuisine</p>
        </header>

        <form action="/users" method="POST" class="form1">
            @csrf
            <div class="mb-6">
                {{-- <label for="name" class="inline-block text-lg mb-2">
                    Name
                </label> --}}
                <input
                    type="text" align="center"
                    class="un" placeholder="User Name"
                    name="name" value="{{old('name')}}"
                />
                @error('name')
                <p class="text-red-500 text-xs mt-1"  align="center">{{$message}}</p>
                @enderror
            </div>

            <div class="mb-6">
                {{-- <label for="email" class="inline-block text-lg mb-2"
                    >Email</label
                > --}}
                <input
                    type="email" align="center"
                    class="un" placeholder="Email"
                    name="email"  value="{{old('email')}}"
                />
                @error('email')
                <p class="text-red-500 text-xs mt-1"  align="center">{{$message}}</p>
                @enderror
            </div>

            <div class="mb-6">
                {{-- <label
                    for="password"
                    class="inline-block text-lg mb-2"
                >
                    Password
                </label> --}}
                <input
                    type="password" align="center"
                    class="pass" placeholder="Password"
                    name="password" value="{{old('password')}}"
                />
                @error('password')
                <p class="text-red-500 text-xs mt-1"  align="center">{{$message}}</p>
                @enderror
            </div>

            <div class="mb-6">
                {{-- <label
                    for="password2"
                    class="inline-block text-lg mb-2"
                >
                    Confirm Password
                </label> --}}
                <input
                    type="password" align="center"
                    class="pass" placeholder="Password"
                    name="password_confirmation" value="{{old('password_confirmation')}}"
                />
                @error('password_confirmation')
                <p class="text-red-500 text-xs mt-1"   align="center">{{$message}}</p>
                @enderror
            </div>

            <div class="mb-6 centring">
                <button
                    type="submit"
                    class="submit" align="center"
                >
                    Register
                </button>
            </div>

            <div class="mt-2" align="center">
                <p  class="forgot">
                    Already have an account?
                    <a href="/login" class="text-laravel a"
                        >Login</a
                    >
                </p>
            </div>
        </form>
        <br>
        <div class="centring">
            <a class="submit a" href="/">back</a>
        </div>
    </div>
        
    </div>
</x-layout>