<!DOCTYPE html>
<html lang="en">
    <head> 
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="favicon.ico" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
            integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        />
        <link href="{{ asset('css/style.css') }}" rel="stylesheet"> 
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="//unpkg.com/alpinejs" defer></script>
        {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
        {{-- <script>
            tailwind.config = {
                theme: { 
                    extend: {
                        colors: {
                            laravel: "#ef3b2d",
                        },
                    },
                },
            };
        </script> --}}
        <title>Delicious</title>
    </head>
    <body>
        <?php
            session_start();
        ?>
        <nav >
            <ul class="layout_nav">
                @auth
                <li class="">
                    <a href="/" class="items"
                        ><i class="fa-solid fa-gear"></i> Manage account</a>
                        <?php
                        $_SESSION['user_id'] = auth()->id();
                        ?>
                </li>
                {{-- <li class='flex space-x-6'>
                    <span class="welcome">  
                        Welcome {{auth()->user()->name}}
                        
                    </span>
                </li> --}}
                <li>
                    <form action="/logout" method="POST" class="inline">
                        @csrf
                        <button class="logout" type="submit">
                            <i class="fa-solid fa-door-closed"></i>Logout
                        </button>
                    </form>    
                </li>
                @else
                <?php
                     $_SESSION['user_id'] = null;
                ?>
                <li>
                    <a href="/register" class="items"
                        ><i class="fa-solid fa-user-plus"></i> Register</a>
                </li>
                <li>
                    <a href="/login" class="items"
                        ><i class="fa-solid fa-arrow-right-to-bracket"></i>
                        Login</a>
                </li>
                @endauth
            </ul>
        </nav>
        {{-- <div id="example"></div> --}}
        <main>
            {{$slot}}
        </main>

    
        {{-- <x-flash-message /> --}}
    </body>
</html>