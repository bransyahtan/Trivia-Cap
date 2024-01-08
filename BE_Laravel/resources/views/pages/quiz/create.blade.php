{{-- Bug: All input is checked --}}

@extends('components.layout')

@section('title')
    Quizes
@endsection

@section('content')
    @include('components.sidebar')

    <div class="p-4 sm:ml-64 min-h-screen bg-slate-300">
        <div class="p-5 bg-white rounded-lg dark:border-gray-700">
            <h1 class="text-4xl font-bold ">Add Quiz</h1>
            <div class="text-blue-500 my-2">
                <a href="/quizes" class="hover:underline">Quiz</a>
                <span>/</span>
                <a href="#" class="hover:underline">Add</a>
            </div>

            <form method="POST" action="/quizes/add">
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
                                <label for="question" class="font-semibold text-2xl">Question</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6">
                                <textarea type="text" name="question" id="question" value="{{ old('question') }}"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200 resize-y"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-1/6 text-right pt-5">
                                <label for="a" class="font-semibold text-2xl">A</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6 pt-5">
                                <input type="text" name="a" id="a" value="{{ old('a') }}"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200"></input>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-1/6 text-right pt-5">
                                <label for="b" class="font-semibold text-2xl">B</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6 pt-5">
                                <input type="text" name="b" id="b" value="{{ old('b') }}"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200"></input>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-1/6 text-right pt-5">
                                <label for="c" class="font-semibold text-2xl">C</label>
                            </td>
                            <td class="pt-5 pr-5">:</td>
                            <td class="w-5/6 pt-5">
                                <input type="text" name="c" id="c" value="{{ old('c') }}"
                                    class="block outline-none focus:outline-none bg-gray-200 py-1 px-3 rounded-lg border border-gray-400 shadow w-full focus:ring focus:ring-purple-200"></input>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-1/6 text-right pt-5">
                                <label for="c" class="font-semibold text-2xl">Answer</label>
                            </td>
                            <td class="pt-5 pr-5"></td>
                            <td class="w-5/6 pt-5">
                                <div class="flex items-center space-x-4">
                                    <label for="optionA" class="relative">
                                        <input type="radio" id="optionA" name="optionA" class="hidden options"
                                            onclick="changeBackgroundColor('A')">
                                        <div
                                            class="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full bg-white">
                                            A</div>
                                    </label>

                                    <label for="optionB" class="relative">
                                        <input type="radio" id="optionB" name="optionB" class="hidden options"
                                            onclick="changeBackgroundColor('B')">
                                        <div
                                            class="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full bg-white">
                                            B</div>
                                    </label>

                                    <label for="optionC" class="relative">
                                        <input type="radio" id="optionC" name="optionC" class="hidden options"
                                            onclick="changeBackgroundColor('C')">
                                        <div
                                            class="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full bg-white">
                                            C</div>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="max-w-[900px]">
                    <button
                        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 block ml-auto">
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
