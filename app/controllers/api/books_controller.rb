class Api::BooksController < ApplicationController

  before_action :require_logged_in, only: [:create, :update, :destroy]

  def index
    @books = Book.all
    render :index
  end

  def show
    @book = Book.find(params[:id])
    render :show
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      render :show
    else
      render json: @book.errors.full_messages, status: 422
    end

  end

  def update
    @book = Book.find(params[:id])

    if @book.update
      render :show
    else
      render json: @book.errors.full_messages, status: 422
    end

  end

  def destroy
    @book = Book.find(params[:id]).destroy
    if @book.destory
      render :index, status: 200
    else
      render json: @book.errors.full_messages, status: 422
    end
    
  end

  def book_params
    params.require(:book).permit(:title, :description, :author_id)
  end

end