<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    @include('components.sidebar')
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 bg-[#F3F3FD] rounded-lg dark:border-gray-700">
            <div class="mb-7">
                <div>
                    <h1 class="text-2xl font-bold ">Kuis</h1>
                    <h3 class="text-slate-500">home/kuis</h3>
                </div>
            </div>
            <div class="mb-2 flex justify-between px-3">
                <div>
                    <h1 class="text-2xl">List Kuis</h1>
                </div>
                <a href="/" type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Tambah kuis</a>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 max-w-24 ">
                                Pertanyaan
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Jawaban
                            </th>
                            <th scope="col" class="px-6 py-3">
                                tanggal upload
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Aksi</span>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 text-lg whitespace-nowrap dark:text-white max-w-32 overflow-hidden ">
                                Negara apa yang paling luas ke 3 di duniadddddddddddddddddddddddddd ddddddddddddddddddddd
                            </th>
                            <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                Indonesia
                            </td>
                            <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                12-12-2020
                            </td>
                            <td class="px-6 py-4 text-center">
                                <a href="/kuis/detail/1" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail</a>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 text-lg whitespace-nowrap dark:text-white max-w-32 overflow-hidden ">
                                Negara apa yang paling luas ke 3 di duniadddddddddddddddddddddddddd ddddddddddddddddddddd
                            </th>
                            <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                Indonesia
                            </td>
                            <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                12-12-2020
                            </td>
                            <td class="px-6 py-4 text-center">
                                <a href="/kuis/detail/2" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</body>

</html>