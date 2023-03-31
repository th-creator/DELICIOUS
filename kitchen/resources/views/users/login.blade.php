<x-layout>
<div class="container">
    <div class='main login'>
        <header class="text-center">
            <h2 class="sign" style="font-size:30px" align="center">
                Login
            </h2>
            <p class="sign" align="center" >Log into your account</p>
        </header>

        <form action="/users/authenticate" class="form1" method="POST">
            @csrf

            <div class="mb-2 mt">
                <input
                    type="email" align="center"
                    class="un " placeholder="Email"
                    name="email"  value="{{old('email')}}"
                />
                @error('email')
                <p class="text-red-500 text-xs mt-1" align="center">{{$message}}</p>
                @enderror
            </div>

            <div class="mb-6">
                <input
                    placeholder="Password"
                    type="password" class="pass" align="center"
                    name="password" value="{{old('password')}}"
                />
                @error('password')
                <p class="text-red-500 text-lg mt-1" align="center">{{$message}}</p>
                @enderror
            </div>

            <div class="mb-2 centring">
                <button
                    type="submit"
                    class="submit" align="center"
                >Sign in</button>
            </div>

            <div class="mt-2" align="center">
                <p class="forgot">
                    Don't have an account?
                    <a href="/register" class="text-laravel a">Register</a>
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
