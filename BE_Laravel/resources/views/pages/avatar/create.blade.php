{{-- Bug: All input is checked --}}

@extends('components.layout')

@section('title')
    Quizes
@endsection

@section('content')
    @include('components.sidebar')

    <div class="p-4 sm:ml-64 min-h-screen bg-slate-300">
        <div class="p-5 bg-white rounded-lg dark:border-gray-700">
            <h1 class="text-4xl font-bold ">Add Avatar</h1>
            <div class="text-blue-500 my-2">
                <a href="/avatars" class="hover:underline">Avatar</a>
                <span>/</span>
                <a href="#" class="hover:underline">Add</a>
            </div>

            <form method="POST" action="/avatars/add" enctype="multipart/form-data">
                @csrf
                @if ($errors->any())
                    <div class="alert alert-danger flex items-center gap-5">
                        @foreach ($errors->all() as $error)
                            <span class="text-red-500">{{ $error }}</span>
                        @endforeach
                    </div>
                @endif
                <table class="max-w-[900px] mt-5">
                    <tbody class="">
                        <tr>
                            <td class="w-1/6 text-right">
                                <label for="name" class="font-semibold text-2xl">Name</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6">
                                <input type="text" name="name" id="name" value="{{ old('name') }}"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200"></input>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-1/6 text-right pt-5">
                                <label for="price" class="font-semibold text-2xl">Price</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6 pt-5">
                                <input type="text" name="price" id="price" value="{{ old('price') }}"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200"></input>
                            </td>
                        </tr>

                        <tr>
                            <td class="w-1/6 text-right pt-5">
                                <label for="image" class="font-semibold text-2xl">Image</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6 pt-5">
                                <input type="file" name="image" id="image"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200"></input>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-1/6 text-right pt-5">
                                <label for="premium" class="font-semibold text-2xl">Premium</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6 pt-5">
                                <input type="checkbox" name="isPremium"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200"></input>
                            </td>
                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </table>
                <div class="max-w-[900px] mt-5">
                    <button
                        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 block ml-auto"
                        type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        function changeBackgroundColor(option) {
            // Reset background color for all options
            document.querySelectorAll('.options').forEach(input => {
                document.querySelector(`label[for="${input.id}"] div`).classList.remove('bg-purple-500');
            });

            // Set background color for the selected option
            document.querySelector(`label[for="option${option}"] div`).classList.add('bg-purple-500');
        }
    </script>
@endsection
